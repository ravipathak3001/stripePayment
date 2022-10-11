import { useEffect, useState } from "react";

export default function Products(props) {
  const [orders, setOrders] = useState(props.orders);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const total = orders.reduce(
      (total, currentItem) => (total = total + currentItem.price),
      0
    );
    setTotal(total)
  }, []);

  console.log(props, "woohooo");
  return (
    <>
      <h2>Order List</h2>

      <div className="container">
        <div className="col">
          {props.orders.map((value, index) => {
            return (
              <div class="card" key={index}>
                <div class="card-body">
                  <div className="row">
                    <div className="col-2">{index + 1}</div>
                    <div className="col-8">{value.name}</div>
                    <div className="col-2">Rs. {value.price}</div>
                  </div>
                  {/* total */}
                </div>
              </div>
            );
          })}

          {/* card */}
          <div class="card">
            <div class="card-body">
              <div className="row">
                <div className="col-10" style={{ textAlign: "right" }}>
                  <strong>Total</strong>
                </div>
                <div className="col-2">
                  <strong>Rs. {total}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
