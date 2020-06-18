import "whatwg-fetch";

class HttpService {
  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/product")
        .then((response) => {
          resolve(response.json());
        })
        .catch(function (error) {
          console.log("Looks like there was a problem: \n", error);
        });
    });
    return promise;
  };
}

export default HttpService;
