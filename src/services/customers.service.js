import http from "../http-common";

class CustomerDataService {

    getAll(token) {
        return http.get("/user/customers", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    get(token, id) {
        return http.get(`/user/customers/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    create(token, data) {
        return http.post("/user/customers", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    update(token, id, data) {
        return http.put(`/user/customers/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    delete(token, id) {
        return http.delete(`/user/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

}

const customerDataService = new CustomerDataService();
export default customerDataService;
