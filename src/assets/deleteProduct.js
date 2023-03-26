import axios from "axios";

async function RemoveItem(id) {
  try {
    const r = await axios.delete(`http://localhost:8080/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          "access-token"
        )}`,
      },
    });
    return r.data;
  } catch (e) {
    if (e.response.data && e.response) {
      return e.response.data;
    }
  }
}

export default RemoveItem;
