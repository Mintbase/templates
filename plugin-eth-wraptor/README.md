# ETH Wraptor

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSg_Qb_8YmjKCbO3bdXt0QfnZnCtKUWZ4owgU1ugQoSdFPkbcL9gkkFQTabM4VfiOudT8&usqp=CAU" alt="cover_image" width="0" />

## Description

Wrap and unwrap ETH from a chat prompt.


## Local Development


### Run the API server:
```sh
yarn && yarn dev
```

Visit the spec: http://localhost:3000

### Try out the endpoints:

Health: http://localhost:3000/health
Unwrap: http://localhost:3000/unwrap?amount=1.23&chainId=100
Wrap: http://localhost:3000/wrap?amount=2.31&chainId=100
