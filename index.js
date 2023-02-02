const form = document.querySelector("#form");
      const productList = document.querySelector("#productList");
      const total = document.querySelector("#total");

      form.addEventListener("submit", async (e) => {
        try {
          e.preventDefault();
          const productName = document.querySelector("#productName").value;
          const sellingPrice = document.querySelector("#sellingPrice").value;
          const product = { productName, sellingPrice };
          await axios.post(
            "https://crudcrud.com/api/4ed6bd35c06049f59a4d7a8bca948529/products",
            product
          );
          updateProductList();
          updateTotal();
          form.reset();
        } catch (error) {
          console.error(error);
        }
      });

      const deleteProduct = async (id) => {
        try {
          await axios.delete(
            `https://crudcrud.com/api/4ed6bd35c06049f59a4d7a8bca948529/products/${id}`
          );
          updateProductList();
          updateTotal();
        } catch (error) {
          console.error(error);
        }
      };

      const updateProductList = async () => {
        try {
          const res = await axios.get(
            "https://crudcrud.com/api/4ed6bd35c06049f59a4d7a8bca948529/products"
          );
          productList.innerHTML = "";
          res.data.forEach((product, i) => {
            const item = document.createElement("li");
            item.innerHTML = `${product.productName} - Rs.${product.sellingPrice} `;
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.addEventListener("click", () => {
              deleteProduct(product._id);
            });
            item.appendChild(deleteBtn);
            productList.appendChild(item);
          });
        } catch (error) {
          console.error(error);
        }
      };

      const updateTotal = async () => {
        try {
          const res = await axios.get(
            "https://crudcrud.com/api/4ed6bd35c06049f59a4d7a8bca948529/products"
          );
          let sum = 0;
          res.data.forEach((product) => {
            sum += parseInt(product.sellingPrice);
          });
          total.innerHTML = "Rs." + sum;
        } catch (error) {
          console.error(error);
        }
      };

      updateProductList();
      updateTotal();
