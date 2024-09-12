import React from "react";

function ProductForm() {
    return (
        <>
            <main>
                <div className="container">
                    <br/>
                    <div class="card">
                        <h5 class="card-header">เพิ่มแก้ไขลบรายการสินค้า</h5>
                        <div class="card-body">
                            {/* <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            <form class="row g-2 needs-validation" novalidate>
                                <div class="col-md-3 position-relative">
                                    <label for="validationTooltip01" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="validationTooltip01" value="Pepsi" required />
                                    <div class="valid-tooltip">
                                        Looks good!
                                    </div>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip03" class="form-label">Price</label>
                                    <input type="text" class="form-control" id="validationTooltip03" required />
                                    <div class="invalid-tooltip">
                                        Please provide a valid Price.
                                    </div>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip02" class="form-label">Quantity</label>
                                    <input type="text" class="form-control" id="validationTooltip02" required />
                                    <div class="valid-tooltip">
                                        Please provide a valid Quantity.
                                    </div>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip04" class="form-label">Category</label>
                                    <select class="form-select" id="validationTooltip04" required>
                                        <option selected disabled value="">Choose...</option>
                                        <option>Food</option>
                                        <option>Drink</option>
                                        <option>Electronic</option>
                                    </select>
                                    <div class="invalid-tooltip">
                                        Please select a Category.
                                    </div>
                                </div>
                                <div class="col-md-3 position-relative">
                                    <label for="validationTooltip02" class="form-label">Description</label>
                                    <textarea type="text" class="form-control" id="validationTooltip02" style={{ height: '150px' }} rows="4" required />
                                </div>      
                                <div class="col-md-3 position-relative">
                                    <label for="validationTooltip05" class="form-label">Manufacturer</label>
                                    <input type="text" class="form-control" id="validationTooltip05"/>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip05" class="form-label">Warranty Period</label>
                                    <input type="text" class="form-control" id="validationTooltip05"/>
                                </div>
                                <div class="col-md-5 position-relative">
                                    <label for="validationTooltip02" class="form-label">Image Url</label>
                                    <textarea type="text" class="form-control" id="validationTooltip02" style={{ height: '125px' }} rows="4"/>
                                </div> 
                                {/* <div class="col-md-2 position-relative">
                                    <label for="validationTooltip04" class="form-label">Rating</label>
                                    <select class="form-select" id="validationTooltip04" required>
                                        <option selected disabled value="">Rate...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div> */}
                                <div class="col-12">
                                    <button class="btn btn-primary" type="submit">Submit form</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductForm;