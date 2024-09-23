import http from "../http-common";
class ImageDataService {

    get(token, id) {
        return http.get(`/image/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    create(token, data) {
        return http.post("/image", data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    delete(token, id) {
        return http.delete(`/admin/image/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

}

const imageDataService = new ImageDataService();
export default imageDataService;
