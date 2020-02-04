const { db } = require("../util/admin");


// Fetch one Project
exports.getProject = (req, res) => {
  let ProjectData = {};
  db.doc(`/Project/${req.params.ProjectId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Claim not found" });
      }
      ProjectData = doc.data();
      ProjectData.ProjectId = doc.id;
      return db
        .collection("Claim")
        .orderBy("createdAt")
        .where("ProjectId", "==", req.params.ProjectId)
        .get();
    })
    .then(data => {
      ProjectData.Claim = [];
      data.forEach(doc => {
        ProjectData.Claim.push(doc.data());
      });
      return res.json(ProjectData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};


exports.getAllProjects = (req, res) => {
  db.collection("Project")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let Project = [];
      data.forEach(doc => {
        Project.push({
          ProjectId: doc.id,
          Project: doc.data().Project,
          userHandle: doc.data().userHandle,
          Contract: doc.data().Contract,
          createdAt: doc.data().createdAt
        });
      });

      return res.json(Project);
    })
    .catch(err => console.error(err));
};

exports.postOneProject = (req, res) => {
  if (req.body.Contract.trim() == "") {
    return res.status(400).json({ Contract: "Body must not be empty" });
  }

  const newProject = {
    Project: req.body.Project,
    userHandle: req.user.handle,
    Contract: req.body.Contract,
    createdAt: new Date().toISOString()
  };

  db.collection("Project")
    .add(newProject)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfuly` });
    })
    .catch(err => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
};

// Delete a Project

exports.deleteProject = (req, res) => {
  const document = db.doc(`/Project/${req.params.ProjectId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Project not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Project deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
