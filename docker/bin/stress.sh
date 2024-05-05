for i in {1..2000}; do 
  curl localhost:31000/api/products
  sleep $1
done