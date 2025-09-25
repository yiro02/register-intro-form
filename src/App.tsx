import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import z from "zod";
import errorIcon from './assets/icon-error.svg';
import './index.css';

const Schema = z.object( {
  firstName: z.string().min(1, "First Name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last  Name is required").max(50, "Last name must be less than 50 characters"),
  emailAddress: z.email("Invalid Email address").max(100, "Email must be less than 100 characters"),
  password: z.string().min(6, "Password Must be at least 6 characters").max(100, "Password must be less than 100 characters")
})

type IFormInput = z.infer<typeof Schema>;  
function App() {
  const { register, handleSubmit, formState } = useForm<IFormInput>({
    resolver: zodResolver(Schema),
    mode: "onChange"
  })

  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // alert(`Form submitted successfully with data: ${JSON.stringify(data)}`);

    
    fetch('http://localhost:4000/api/forms', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(x => x.json()).then(res => {
      console.log("Form submitted successfully:", res);  }).catch(error => {
      console.error("Error submitting form:", error);
    });
  }
  const onError = (errors: unknown) => {
    console.error("Form submission errors:", errors);
  }

  return (
    <div className="h-screen antialiased bg-[url(/images/bg-intro-desktop.png)] bg-red-400 flex items-center justify-center gap-30 flex-col md:flex-row">
      <div className="text-white text-justify"> 
        <p className="text-5xl font-bold @md py-2.5">Learn to code by <br /> watching others</p>
        <p className="text-justify  @md -mb-25">
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
          <form onSubmit={handleSubmit(onSubmit, onError)} className="text-base font-semibold text-gray-900 w-full">
            <div className="mb-4 relative">
              <input {...register("firstName")}
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`w-98 rounded-md border-2 px-3 py-3 -mx-6   mb-3 ${errors.firstName ? 'border-red-500' : 'border-neutral-300'}`}
              />
              {errors.firstName && <div className="flex items-center justify-start flex-row-reverse gap-3 ">
                <img src={errorIcon} alt="error" />
                <p className="text-red-500 text-lx">{errors.firstName.message}</p>
              </div>}
            </div>

            <div className="mb-4 relative">
              <input {...register("lastName")}
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`w-98 rounded-md border-2 px-3 py-3 -mx-6 mb-2.5 ${errors.lastName ? 'border-red-500' : 'border-neutral-300'}`}
              />
             {errors.lastName && <div className="flex items-center justify-start gap-2 flex-row-reverse">
                <img src={errorIcon} alt="error" />
                <p className="text-red-500 text-lx">{errors.lastName.message}</p>
              </div>}
              </div>

            <div className="mb-4 relative">
              <input {...register("emailAddress")}
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                className={`w-98 rounded-md border-2 px-3 py-3 -mx-6 mb-2.5 ${errors.emailAddress ? 'border-red-500' : 'border-neutral-300'}`}
              />
               {errors.emailAddress && <div className="flex items-center justify-start gap-2 flex-row-reverse">
                <img src={errorIcon} alt="error" />
                <p className="text-red-500 text-lx">{errors.emailAddress.message}</p>
              </div>}
            </div>
            <div className="mb-4 relative">
              <input {...register("password")}
                type="password"
                name="password"
                placeholder="Password (min 6 caracteres)"
                className={`w-98 rounded-md border-2 -mx-6 px-3 py-3 mb-2.5 ${errors.password ? 'border-red-500' : 'border-neutral-300'}`}
              />
              {errors.password && <div className="flex items-center justify-start gap-2 flex-row-reverse">
                <img src={errorIcon} alt="error" />
                <p className="text-red-500 text-lx">{errors.password.message}</p>
              </div>}
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