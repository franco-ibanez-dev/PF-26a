import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { get_one_user } from "../../api_url/api_url";

import { useAuth } from "../../context/AuthContext";

import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const [userDb, setUserDb] = useState("");
  const { logout, user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isMounted = true;
    function getUser() {
      let localUser = JSON.parse(localStorage.getItem("usuario"));
      if (localUser) return get_one_user + localUser;
    }
    async function fetchData() {
      const result = await axios.get(getUser());
      if (isMounted) {
        setUserDb(result.data);
        console.log(userDb);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <Redirect to="/" />;
  }
  // console.log(typeof userDb.sell_orders);
  return (
    <div className="wrapper">
      <div className="container">
        <div className="user-info">
          <h3 className="title">
            {userDb?.email} {userDb === null ? "Debes loguearte" : null}{" "}
          </h3>
          {userDb?.image ? (
            <img src={userDb?.image} alt="" className="profile" />
          ) : (
            <FaUserCircle className="profile" />
          )}

          <p className="title">{userDb?.fullName}</p>

          <div className="div-details">
            <div className="container-details">
              <p className="details">
                <span className="span-details">{t("profile.country")}</span>
                <br /> {userDb?.country}
              </p>
              <p className="details">
                <span className="span-details">{t("profile.province")}</span>
                <br />
                {userDb?.province}
              </p>
              <p className="details">
                <span className="span-details">{t("profile.city")}</span>
                <br />
                {userDb?.city}
              </p>
              <p className="details">
                <span className="span-details">{t("profile.street")}</span>
                <br />
                {userDb?.street}
              </p>
              <p className="details">
                <span className="span-details">{t("profile.postalCode")}</span>
                <br />
                {userDb?.postalCode}
              </p>

              {/* <p className="details">
                <h4>Compras: </h4>
                {userDb?.sell_orders?.map((e) => (
                  <span key={e.id}>
                    {e.product}.
                    <br />
                  </span>
                ))}
              </p> */}
            </div>
          </div>
          <Link to="/purchases">
            <button className="btnProfile">Purchase history</button>
          </Link>
        </div>
      </div>
      <Link to="/profile/form">
        <button className="btnProfile">{t("profile.editeProfile")}</button>
      </Link>

      <button className="btnProfile" onClick={handleLogout}>
        {t("profile.logOut")}
      </button>
    </div>
  );
};

export default Profile;
