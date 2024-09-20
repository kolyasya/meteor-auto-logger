import React, { useState, useEffect } from "react";
import { Random } from "meteor/random";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { LinksCollection } from "../api/links";

export const Info = () => {
  const [randomParam, setRandomParam] = useState();

  useSubscribe("links", randomParam)

  const links = useTracker(() => {
    return LinksCollection.find().fetch();
  });

  // Trigger resubscription
  useEffect(() => {
    setInterval(() => {
      setRandomParam(Random.id());
    }, 5000);
  }, []);


  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
