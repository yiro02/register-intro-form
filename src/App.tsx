import { useState, type FormEvent } from "react";
import './index.css';
import errorIcon from './assets/icon-error.svg';

function App() {
  const [person, setPerson] = useState({
    name: "",
    lastName: "",
    emailAddress: "",
    password: ""
  });
  
  const [errors, setErrors] = useState({
    name: false,
    lastName: false,
    emailAddress: false,
    password: false,
  });

  const handleInsertPerson = (field: keyof typeof person, value: string) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetear errores
    const newErrors = {
      name: person.name.trim() === "",
      lastName: person.lastName.trim() === "",
      emailAddress: !/^\S+@\S+\.\S+$/.test(person.emailAddress),
      password: person.password.trim().length < 6
    };

    setErrors(newErrors);
    //Verificar si hay errores
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      // Mostrar un mensaje si hay errores
      return; 
    }
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
    // Validación pasada
    setErrors({ name: false, lastName: false, emailAddress: false, password: false });
    console.log("Formulario enviado con éxito!");
    alert(`Bienvenido, ${person.name}!`);
  };

  return (
    <div className="h-screen antialiased bg-[url(/images/bg-intro-desktop.png)] bg-red-400 flex items-center justify-center gap-30 flex-col md:flex-row">
      <div className="text-white text-justify">
        <p className="text-5xl font-bold py-6">Learn to code by <br /> watching others</p>
        <p className="text-justify">
          See how experienced developers solve problems in real-time.
          <br /> Watching scripted tutorials is great, but understanding how
          <br /> developers think is invaluable.
        </p>
      </div>

      <div className="flex items-center justify-center flex-col">
        <p className="bg-neutral-400 text-white text-center text-base w-115 h-13 py-2 rounded-md shadow-3xl mb-7">
          <strong>Try it free 7 days</strong> then $20/mo. thereafter
        </p>
        <div className="max-w-md mx-auto bg-white p-13 rounded-lg shadow-5xl pt-10">
          <form onSubmit={handleSubmit} className="text-base font-semibold text-gray-900 w-full">
            <div className="mb-4 relative">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`w-98 rounded-md border-2 px-3 py-3 -mx-6  mb-2.5 ${errors.name ? 'border-red-500' : 'border-neutral-300'}`}
                value={person.name}
                onChange={(e) => handleInsertPerson('name',e.target.value)} 
              />
              {errors.name && <img src={errorIcon} alt="error" className="absolute-right-3   w-6 h-6 ml-84"/>}
              {errors.name && <p className="text-red-500 text-lx absolute -bottom-4 left-29 top-15">First Name can not be empty.</p>}
             </div>

            <div className="mb-4 relative">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`w-98 rounded-md border-2 px-3 py-3 -mx-6 mb-2.5 ${errors.lastName ? 'border-red-500' : 'border-neutral-300'}`}
                value={person.lastName}
                onChange={(e) => handleInsertPerson('lastName',e.target.value)} 
                />
              {errors.name && <img src={errorIcon} alt="error" className="relative -right-3  w-6 h-6 ml-81"/>} 
              {errors.lastName && <p className="text-red-500 text-lx absolute -bottom-4 left-30 top-15">Last Name can not be empty.</p>}
              </div>

            <div className="mb-4 relative">
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                className={`w-98 rounded-md border-2 px-3 py-3 -mx-6 mb-2.5 ${errors.emailAddress ? 'border-red-500' : 'border-neutral-300'}`}
                value={person.emailAddress}
                onChange={(e) => handleInsertPerson('emailAddress',e.target.value)}
              />
                 {errors.emailAddress && <img src={errorIcon} alt="error" className="relative -right-3  w-6 h-6 ml-81.5"/>} 
                 {errors.emailAddress && <p className="text-red-500 text-lx absolute -bottom-4 left-25 top-15">emailAddress can not be empty.</p>}
              </div>

            <div className="mb-4 relative">
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 caracteres)"
                className={`w-98 rounded-md border-2 -mx-6 px-3 py-3 mb-2.5 ${errors.password ? 'border-red-500' : 'border-neutral-300'}`}
                value={person.password}
                onChange={(e) => handleInsertPerson('password',e.target.value)}
              />

                {errors.password && <img src={errorIcon} alt="error" className="absolute-right-3   w-6 h-6 ml-84"/>}
                {errors.password && <p className="text-red-500 text-lx absolute -bottom-4 left-32 top-15">Password can not be empty.</p>}
           </div>
            <button
              type="submit"
              className=" bg-Neutral-50 hover:bg-Neutral-100 text-white font-bold py-3 px-4 rounded w-99 -mx-6 text-1xl cursor-pointer">
              TRY IT FREE
            </button>
            <p className="text-center text-neutral-500 text-xs mt-4 w-100 -mx-6">
              By clicking the button, you are agreeing to our <span className="text-red-400 font-bold">Terms and Services</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;