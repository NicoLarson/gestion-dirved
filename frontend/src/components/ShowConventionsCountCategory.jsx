import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Convention = (props) => (
  <tr>
    <td>{props.convention.con_num_operation}</td>
  </tr>
);

export default function ShowConventionsCountCategory() {
  const [conventions, setConventions] = useState([]);

  // This method fetches the conventions from the database.
  useEffect(() => {
    async function getConventions() {
      const response = await fetch(`http://localhost:5000/show/conventions/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const conventionsRes = await response.json();
      setConventions(conventionsRes);
    }

    getConventions();
  }, [conventions.length]);

  // This method will delete a convention
  async function deleteConvention(id) {
    await fetch(`http://localhost:5000/delete/convention/${id}`, {
      method: 'DELETE',
    });

    const newConventions = conventions.filter((el) => el._id !== id);
    setConventions(newConventions);
  }

  // This method will map out the conventions on the table
  function conventionList() {
    return conventions.map((convention) => {
      return (
        <Convention
          convention={convention}
          deleteConvention={() => deleteConvention(convention._id)}
          key={convention._id}
        />
      );
    });
  }
  const categoryCount = {};

  conventions.forEach((item) => {
    if (!categoryCount[item.con_categories]) {
      categoryCount[item.con_categories] = 0;
    }
    categoryCount[item.con_categories]++;
  });

  const displayCategories = Object.keys(categoryCount).map((key) => {
    return (
      <div className="stat">
        <Link className="uppercase" to={`/show/conventionsbycategory/${key}`}>
          {key}
          <div className="stat-value">{categoryCount[key]}</div>
        </Link>
      </div>
    );
  });

  // This following section will display the table with the conventions of individuals.
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-5xl font-bold uppercase">Conventions</h1>
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-8">
            {displayCategories}
          </div>
        </div>
      </div>
    </div>
  );
}
