import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import './Card.css'

function Card(props){
    if(props.cardNumber===1){
        return <Card1 />;
    }
    else if(props.cardNumber===2){
        return <Card2 />;
    }
    else if(props.cardNumber===3){
        return <Card3 />;
    }
    else if(props.cardNumber===4){
        return <Card4 />;
    }
}
export default Card;