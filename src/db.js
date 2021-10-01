import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
PouchDB.plugin(PouchdbFind);
const db = new PouchDB("todos_db");

const getAllTodos = () => {
  return db
    .allDocs({
      include_docs: true,
    })
    .then((res) => {
      return res;
    });
};

const addDoc = (todo_title) => {
  const doc = {
    _id: String(Date.now()),
    name: todo_title,
    status: "todo",
  };
  return db.put(doc).then((res) => {
    return res;
  });
};

const deleteDoc = (todo_title) => {
  return db
    .find({
      selector: {
        name: todo_title,
      },
    })
    .then((doc) => {
      return db.remove(doc.docs[0]._id, doc.docs[0]._rev).then((res) => {
        return res.id;
      });
    });
};

export { getAllTodos, addDoc, deleteDoc };
