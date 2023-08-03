import React from "react";

const CatForm = ({ setValue, value, handleSubmit, edit = false }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button type="submit" className="cart-btn">
        {edit ? "Update Category" : "Create category"}
      </button>
    </form>
  );
};

export default CatForm;
