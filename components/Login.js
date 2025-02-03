import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'expo-router';

//Configuración basica de firebase para poder registrarse con mail
const firebaseConfig = {
    apiKey: "AIzaSyAKl5f-i59RjHRnjAoAzBe8FPXM_Bg-RJo",
    authDomain: "proyectopglut3.firebaseapp.com",
    projectId: "proyectopglut3",
    storageBucket: "proyectopglut3.firebasestorage.app",
    messagingSenderId: "903803628079",
    appId: "1:903803628079:web:dd1b10822e1f4487f0b4da",
    measurementId: "G-43TMXN981T"
  };
  
const app = initializeApp(firebaseConfig);
//Componentes de autentificación que permite al usuario registrar o iniciar sesión
const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    //Te dice Sign In o Sign Up según si quieres registrarte o iniciar sesión
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
    {/*Campo de entrada para el correo electrónico */}
       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      {/*Campo de entrada para la contraseña*/}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
       {/*Botón para iniciar sesión o registrarse*/}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Iniciar sesión' : 'Registrarse'} onPress={handleAuthentication} color="#66bb6a" />
      </View>
       {/*Opción para cambiar entre inicio de sesión y registrarse*/}
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Necesitas una cuenta? Registrarse' : 'Ya tienes cuenta? Iniciar sesión'}
        </Text>
      </View>
    </View>
  );
}

export default Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [autenticacionCorrecta, setAutenticacionCorrecta] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const auth = getAuth(app); //instancia de autentificación firebase

  // useEffect para detectar cambios en la autentificación del usuario.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); //actualizaremos el estado con el usuario autentificado o null si ha sido cerrado
    });

    return () => unsubscribe();  //limpiamos el observador cuando el componente se desmonta
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Sign IN Correcto');
          setAutenticacionCorrecta(true);
          setErrorMessage('');
        }
        else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('Usuario creado');
          setErrorMessage('');
        }
    }
    catch (error) {
      console.error('ERROR DE AUTENTICACION', error.message);
      setErrorMessage('ERROR DE AUTENTICACION');
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    if (autenticacionCorrecta) {
      router.replace('/home');
    }
  }, [autenticacionCorrecta]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!autenticacionCorrecta && (
        <>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#35919d',
  },
  authContainer: {
    width: '80%',
    maxWidth: 450,
    backgroundColor: '#e6f8fb',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
