const { db } = require("../util/admin");

exports.getAllWorkflows = (req, res) => {
  db.collection("Workflow")
    .orderBy("createdAt")
    .get()
    .then(data => {
      let Workflow = [];
      data.forEach(doc => {
        Workflow.push({
          completed: doc.data().completed,
          currentStep: doc.data().currentStep,
          createdAt: doc.data().createdAt,
          Reason: doc.data().Reason,
          breach: doc.data().breach,
          cauInd: doc.data().cauInd,
          cauOth: doc.data().cauOth,
          cauWea: doc.data().cauWea,
          claimEoT: doc.data().claimEoT,
          dateAware: doc.data().dateAware,
          dateEoTClaim: doc.data().dateEoTClaim,
          daysClaimed: doc.data().daysClaimed,
          dec: doc.data().dec,
          delayRespon: doc.data().delayRespon,
          descB: doc.data().descB,
          descCau: doc.data().descCau,
          descExt: doc.data().descExt,
          event: doc.data().event,
          eviCause: doc.data().eviCause,
          eviExtent: doc.data().eviExtent,
          ifGranDay: doc.data().ifGranDay,
          notice: doc.data().notice,
          proMitPro: doc.data().proMitPro,
          proResPro: doc.data().proResPro,
          recWri: doc.data().recWri,
          stepsMit: doc.data().stepsMit,
          stepsPre: doc.data().stepsPre
        });
      });

      return res.json(Workflow);
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

// Add workflow details
exports.updateWorkflow = (req, res) => {
  let Workflow = req.body;
  db.doc(`/Workflow/${req.params.WorkflowId}`)
    .update(Workflow)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.postOneWorkflow = (req, res) => {
  const newWorkflow = req.body;
  newWorkflow.createdAt = new Date().toISOString();

  db.collection("Workflow")
    .add(newWorkflow)
    .then(doc => {
      const resWorkflow = newWorkflow;
      resWorkflow.WorkflowId = doc.id;
      res.json(resWorkflow);
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

// Fetch one workflow
exports.getWorkflow = (req, res) => {
  let workflowData = {};
  db.doc(`/Workflow/${req.params.WorkflowId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Workflow not found" });
      }
      workflowData = doc.data();
      workflowData.WorkflowId = doc.id;
      return db
        .collection("Workflow")
        .orderBy("createdAt")
        .where("WorkflowId", "==", req.params.WorkflowId)
        .get();
    })
    .then(data => {
      workflowData.Details = [];
      data.forEach(doc => {
        workflowData.Details.push(doc.data());
      });
      return res.json(workflowData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
