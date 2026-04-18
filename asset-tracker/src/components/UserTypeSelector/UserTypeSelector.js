import React from 'react';
import './UserTypeSelector.css';

function UserTypeSelector() {
  return (
    <div className="user-type-selector">
      <h3>User Type</h3>
      <div className="user-type-option selected">
        <input 
          type="radio" 
          id="salaried" 
          name="userType" 
          value="salaried" 
          checked 
          readOnly
        />
        <label htmlFor="salaried">
          <span className="radio-custom"></span>
          Salaried Person
        </label>
      </div>
    </div>
  );
}

export default UserTypeSelector;