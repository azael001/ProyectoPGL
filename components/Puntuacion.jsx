import { View, Text } from "react-native";

export function Puntuacion({ puntuacionActual, puntuacionMaxima }) {
    const getColor = () => {
        const porcentaje = (puntuacionActual / puntuacionMaxima) * 100;
        if (porcentaje < 3) {
            return "bg-red-500";
        }
        else if (porcentaje < 7) {
            return "bg-yellow-500";
        }
        else {
            return "bg-green-500";
        }
    }

    const puntuacionClassName = getColor();

    return (
        <View style={{ borderRadius: 9999, alignSelf: 'flex-start' }} className={`${puntuacionClassName}`}>
            <Text style={{ fontWeight: 'bold', color: '#EEEEEE', textShadow: '0 0 8px black' }}>{puntuacionActual}</Text>
        </View>
    );
}
