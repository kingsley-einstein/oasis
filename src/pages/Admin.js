/* eslint-disable react-hooks/exhaustive-deps */
import "../style/Admin.css";
import firebase from "../data/firebase";
import { deleteRepo } from "../utils/controls";
import { useEffect, useState } from "react";
import _ from "lodash";

const Admin = () => {
  const db = firebase.firestore();
  const [list, setList] = useState([]);

  useEffect(() => {
    db.collection("projects")
      .get()
      .then(snapshot => {
        let projects = [];

        // snapshot.forEach(doc => {
        //   projects.push(doc.data());
        // });
        for (const doc of snapshot.docs)
          projects = _.concat(projects, {
            id: doc.id,
            ...doc.data()
          });

        setList(projects);
      });
  }, []);

  const removeRepo = id => deleteRepo(id);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Danger Zone</th>
          </tr>
          {list.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.owner}</td>
              <td>
                <button onClick={() => removeRepo(project.id)}>
                  Delete Document
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
