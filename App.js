import { StyleSheet, Text, View, ImageBackground, Button, Image } from 'react-native';
goal
import React, {useState} from 'react';
import {Dimensions} from 'react-native';

const apiCat = "https://cataas.com/cat?width=300&height=300";
const apiFact = "https://uselessfacts.jsph.pl/api/v2/facts/random";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function App() {

  const[factData,setFact] = useState('Toca el boton para algo perturbador');
  const[image,setImage] = useState(require('./assets/adaptive-icon.png'));

 async function retrieveData(){
	setFact('****');
	setImage({uri:apiCat+'&rand='+new Date().getTime()});
	try{
		const response = await fetch(apiFact);
		const data = await response.json();
		setFact(data.text);
	}catch(error){
		console.error('Error fetching data', error);
	}
 }

  return (
	<ImageBackground source={require('./assets/bg.jpeg')} 
		style={styles.background}>
    		<View style={styles.container}>
			<Text style={styles.title}>Welcome</Text>
			<Image source={image} 
			style={styles.image} />
      			<Text>{factData}</Text>
			<Button title='DATO RANDOM' 
				onPress={retrieveData}></Button>
      			
    		</View>
	</ImageBackground>
  );
}

const styles = StyleSheet.create({
	background:{
		width:'100%',
		height:'100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
  	container: {
		width:'80%',
    		
    		backgroundColor: '#efefef',
		borderRadius:15,
		padding: 20,
    		alignItems: 'center',
    		justifyContent: 'center',
  	},
	image:{
		width: windowWidth*0.6,

		height: windowWidth*0.6,
		resizeMode:'contain',
	},	
	title:{
		fontSize:40,
		fontFamily: 'Roboto',
		color:'#222',
	},
});

