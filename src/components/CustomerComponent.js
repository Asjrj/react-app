import React from 'react'

const CustomerComponent = (props) => (
  <div>
    <div className="CustomerData">
    <ul>{props.data.map(item => <li className="customerList" key={item.id}>{item.id}, {item.name}</li>)}</ul>
    </div>
  </div>
)

export default CustomerComponent