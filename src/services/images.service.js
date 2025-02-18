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
                'Authorization': `Bearer ${token}`
            }
        });
    }

    // API ยังไม่สร้าง
    
    // delete(token, id) {
    //     return http.delete(`/user/customers/${id}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    // }

}

const imageDataService = new ImageDataService();
export default imageDataService;
