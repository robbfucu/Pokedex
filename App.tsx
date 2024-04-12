
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/"
const pokeQuery = "pokemon?limit=151&offset=0"
const firstGenPokemonPath = `${pokePath}${pokeQuery}`

export default function App() {

    const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([])

    useEffect(() => {
        const fetchFirstGenPokemon = async () => {
            const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath)
            const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json()

            const firstGenPokemonDetails = await Promise.all(
                firstGenPokemonIdsBody.results.map(async (p) => {
                    const pDetails = await fetch(p.url)
                    return await pDetails.json()
                })
            )
            console.log("Detalles: ", firstGenPokemonDetails)
            setfirstGenPokemonDetails(firstGenPokemonDetails)
        }
        fetchFirstGenPokemon()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={firstGenPokemonDetails}
                renderItem={({ item }) => <Text style={styles.text}> {item.name}</Text>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#000",
        fontSize: 20
    }
})
