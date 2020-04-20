const { admin, db } = require('../util/admin');

const config = require('../util/config');

exports.getAllOperations = (req, res) => {
	db
		.collection('Operation')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let Operation = [];
			data.forEach((doc) => {
				Operation.push({
					OperationId: doc.id,
					WorkflowId: doc.data().WorkflowId,
					ProjectId: doc.data().ProjectId,
					Project: doc.data().Project,
					userHandle: doc.data().userHandle,
					body: doc.data().body,
					Progress: doc.data().Progress,
					createdAt: doc.data().createdAt
				});
			});

			return res.json(Operation);
		})
		.catch((err) => console.error(err));
};

// creates new Operation and also new Workflow.

exports.OperationOnProject = (req, res) => {
	const newOperation = {
		ProjectId: req.params.ProjectId,
		Progress: 'new',
		createdAt: new Date().toISOString()
	};

	const newWorkflow = {
		createdAt: new Date().toISOString()
	};
	const newFiles = {
		createdAt: new Date().toISOString()
	};

	console.log(newOperation);

	db
		.doc(`/Project/${req.params.ProjectId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Project not found' });
			}
			return doc.ref.update({ OperationsCount: doc.data().OperationsCount + 1 });
		})
		.then(() => {
			return db.collection('Workflow').add(newWorkflow);
		})
		.then((doc) => {
			newOperation.WorkflowId = doc.id;
			return db.collection('Operation').add(newOperation);
		})
		.then(() => {
			res.json(newOperation);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Something went wrong' });
		});
};

// Fetch one Operation
exports.getOperation = (req, res) => {
	let operationData = {};
	db
		.doc(`/Operation/${req.params.OperationId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Operation not found' });
			}
			operationData = doc.data();
			operationData.OperationId = doc.id;
			return db.collection('Workflow').orderBy('createdAt').where('OperationId', '==', req.params.OperationId).get();
		})
		.then((data) => {
			operationData.Workflow = [];
			data.forEach((doc) => {
				operationData.Workflow.push(doc.data());
			});
			return res.json(operationData);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};

exports.WorkflowOnOperation = (req, res) => {
	if (req.body.body.trim() === '') return res.status(400).json({ Workflow: 'Must not be empty' });

	const newWorkflow = {
		body: req.body.body,
		createdAt: new Date().toISOString(),
		OperationId: req.params.OperationId
	};
	console.log(newWorkflow);

	db
		.doc(`/Operation/${req.params.OperationId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Operation not found' });
			}
			return doc.ref.update({ WorkflowsCount: doc.data().WorkflowsCount + 1 });
		})
		.then(() => {
			return db.collection('Workflow').add(newWorkflow);
		})
		.then(() => {
			res.json(newWorkflow);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Something went wrong' });
		});
};

// Delete a Operation

exports.deleteOperation = (req, res) => {
	const document = db.doc(`/Operation/${req.params.OperationId}`);
	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Operation not found' });
			}
			if (doc.data().userHandle !== req.user.handle) {
				return res.status(403).json({ error: 'Unauthorized' });
			} else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Operation deleted successfully' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

// Upload a document for Operation

//https://cloud.google.com/functions/docs/writing/http
exports.uploadDocument = (req, res) => {
	const BusBoy = require('busboy');

	const path = require('path');

	const os = require('os');

	const fs = require('fs');

	const busboy = new BusBoy({ headers: req.headers });

	let DocumentToBeUploaded = {};
	let DocumentFileName;
	// change this section to storing pdfs and docs etc

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		console.log(fieldname, file, filename, encoding, mimetype);

		const documentExtension = filename.split('.')[filename.split('.').length - 1];
		// 3275623844837-Grumpy_cat.png TODO: proper UUIDs
		DocumentFileName = `${Math.round(Math.random() * 100000000).toString()}-${filename}`;

		const filepath = path.join(os.tmpdir(), DocumentFileName);
		DocumentToBeUploaded = { filepath, mimetype };
		file.pipe(fs.createWriteStream(filepath));
	});
	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(DocumentToBeUploaded.filepath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: DocumentToBeUploaded.mimetype
					}
				}
			})
			.then(() => {
				const id = req.params.OperationId;
				const docUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${DocumentFileName}?alt=media`;
				const OperationFilesRef = db.collection(`/Operation`);
				return OperationFilesRef.doc(id).collection('files').doc().set({
					url: docUrl,
					name: DocumentFileName,
					uploadedAt: new Date().toISOString()
				});
			})
			.then(() => {
				return res.json({ message: 'document uploaded successfully' });
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: 'something went wrong' });
			});
	});
	busboy.end(req.rawBody);
};

exports.getDocuments = (req, res) => {
	db
		.doc(`/Operation/${req.params.OperationId}`)
		.collection('files')
		.get()
		.then((data) => {
			const files = [];

			data.forEach((doc) => {
				files.push(doc.data());
			});

			return res.json({ data: files, message: null });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};
