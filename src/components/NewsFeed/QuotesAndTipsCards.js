import React, {useState, useEffect} from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, 
  Text, Button } 
  from "@chakra-ui/react";

const QuotesAndTipsCards = () => {
  const [quoteInfo, setQuoteInfo] = useState({
    quote : 'Happiness is secured through virtue it is a good attained by man\'s own will.',
    author : 'Thomas Aquinas',
    category : 'happiness'
  });
  useEffect(() => {
    axios.get("http://localhost:4000/api/quotestips/quotes")
    .then((response) => {
      console.log(response.data);
      setQuoteInfo(response.data[0]);
    });
  }, []);

  
  return (
    <Card
      m={15}
      maxW="md"
      bgImage={
        "https://media.istockphoto.com/id/157639696/photo/purple-space-stars.jpg?s=612x612&w=0&k=20&c=fkLtGZxUS9UPlLJUTeGjvvURT0u-vtxvj5sAYbDNrH4="
      }
    >
      <CardHeader align="center" justify="center">
        <Text color="white">Inspirational Quote</Text>
      </CardHeader>

      <CardBody align="center" justify="center">
        <Text color="white">{quoteInfo.quote}</Text>
        <Text color="white" fontSize="sm">{quoteInfo.author}</Text>
      </CardBody>

      <CardFooter justify="space-between" flexWrap="wrap">
        <Button
          color="white"
          flex="1"
          variant="ghost"
          leftIcon={<i className="bi bi-heart"></i>}
        >
          Like
        </Button>

        <Button
          color="white"
          flex="1"
          variant="ghost"
          leftIcon={<i className="bi bi-share" color="white"></i>}
        >
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuotesAndTipsCards;
