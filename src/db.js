import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
PouchDB.plugin(PouchdbFind);
const db = new PouchDB("todos_db");

const syncChanges = (setNewChange) => {
  db.changes({
    since: "now",
    live: true,
  }).on("change", () => {
    setNewChange((prev) => !prev);
  });
};

const getTodos = (todo_status) => {
  return db
    .find({
      selector: {
        status: todo_status === "all" ? { $ne: null } : todo_status,
      },
      sort: [{ _id: "desc" }],
    })
    .then((doc) => {
      return doc.docs;
    });
};

const addDoc = (todo_title) => {
  const doc = {
    _id: String(Date.now()),
    name: todo_title,
    status: "uncompleted",
  };
  return db.put(doc).then((res) => {
    return res;
  });
};

const deleteDoc = (todo_title) => {
  db.find({
    selector: {
      name: todo_title,
    },
  }).then((doc) => {
    db.remove(doc.docs[0]._id, doc.docs[0]._rev);
  });
};

const docStatusUpdate = (todo_title) => {
  return db
    .find({
      selector: {
        name: todo_title,
      },
    })
    .then((doc) => {
      const fetchedDoc = doc.docs[0];
      const newStatus =
        fetchedDoc.status === "completed" ? "uncompleted" : "completed";
      return db
        .put({
          _id: fetchedDoc._id,
          _rev: fetchedDoc._rev,
          status: newStatus,
          name: fetchedDoc.name,
        })
        .then(() => {
          return "updated";
        });
    });
};

export { syncChanges, getTodos, addDoc, deleteDoc, docStatusUpdate };
