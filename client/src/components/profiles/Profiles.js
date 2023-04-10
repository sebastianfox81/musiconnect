import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { useGlobalContext } from '../../context';

const Profiles = () => {
  const { getAllProfiles, loading, profiles } = useGlobalContext();
  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Musicians</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            musicians
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profiles;
