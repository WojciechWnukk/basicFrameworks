import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"
import User from "./User"
import Users from "./Users"

const Main = () => {
const handleLogout = () => {
localStorage.removeItem("token")
window.location.reload()
}
const [dane, ustawDane] = useState([])
const [details, setDetails] = useState(null)
const handleGetUsers = async (e) => {
    e.preventDefault()
    setDetails(null)
   //pobierz token z localStorage:
    const token = localStorage.getItem("token")
    //jeśli jest token w localStorage to:
    if (token) {
    try {
    //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
    const config = {
    method: 'get',
    url: 'http://localhost:8080/api/users',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    }
    //wysłanie żądania o dane:
    const { data: res } = await axios(config)
    //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
    //z serwera – jeśli został poprawnie zweryfikowany token
    ustawDane(res.data) // `res.data` - zawiera sparsowane dane – listę
    } catch (error) {
    if (error.response && error.response.status >= 400 &&error.response.status <= 500)
    {
    localStorage.removeItem("token")
    window.location.reload()
    }
    }
    }
    }
    const handleGetUserDetails = async (e) => {
        e.preventDefault()
        ustawDane([])
   //pobierz token z localStorage:
    const token = localStorage.getItem("token")
    //jeśli jest token w localStorage to:
    if (token) {
    try {
    //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
    const config = {
    method: 'get',
    url: 'http://localhost:8080/api/users/user',
    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
    }
    const { data: res } = await axios(config)
    // Wyświetl szczegóły użytkownika (np. za pomocą modala, komponentu, itp.)
    console.log(res.data)
    setDetails(res.data)
  } catch (error) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      localStorage.removeItem("token")
      window.location.reload()
    }
  }
}
}

    const deleteUser = async (e) => {
        e.preventDefault()
        const confirmed = window.confirm("Czy na pewno chcesz usunąć swoje konto?")

        if (confirmed) {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const config = {
          method: 'delete',
          url: 'http://localhost:8080/api/users',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }

        await axios(config)
        // Usunięcie użytkownika powiodło się
        ustawDane([]) // Czyścimy listę użytkowników
      } catch (error) {
        // Obsługa błędów
      }
    }
    handleLogout()
    }
   
}


return (
    <div className={styles.main_container}>
<nav className={styles.navbar}>

<button className={styles.white_btn} onClick={handleGetUsers}>
Users
</button>
<button className={styles.white_btn} onClick={handleGetUserDetails}>
Account details
</button>
<button className={styles.white_btn} onClick={deleteUser}>
Delete account
</button>
<button className={styles.white_btn} onClick={handleLogout}>
Logout
</button>
</nav>
<div>
{dane.length>0 ? <Users users={dane} /> : <p></p>}

{details ? (
    <div>
      <p>First Name: {details.firstName}</p>
      <p>Last Name: {details.lastName}</p>
      <p>Email: {details.email}</p>
      {/* Wyświetl inne informacje o użytkowniku */}
    </div>
  ) : (
    <p> </p>
  )}
</div>
</div>
)
}
export default Main