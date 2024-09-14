import http from "../http-common";

class ProductDataService {


  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(token, data) {
    return http.post("/admin/products", data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  update(token, id, data) {
    return http.put(`/admin/products/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  delete(token, id) {
    return http.delete(`/admin/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}

const productDataService = new ProductDataService();
export default productDataService;

