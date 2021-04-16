import React from "react";

import gmailApi from "../../controllers/GmailAPI/GmailAPI";

export default function Logout(props) {

    const logout = () => {
        gmailApi.handleSignOut().then(() => {
          localStorage.setItem('isLoggedIn', JSON.stringify(false))
        });
        setTimeout(function(){ window.location.reload(); }, 500);

            

    };

    return (
        <div onClick={logout}>
            Sign Out
        </div>
        // <button onClick={logout}>SignOut Google</button>
    );

}