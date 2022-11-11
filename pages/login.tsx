import Head from 'next/head'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import Layout from '../components/UI/Layout'
import Logo from '../components/UI/Logo'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Parvulapps | Login</title>
      </Head>
      <div
        style={{
          background:
            'linear-gradient(119deg, #6FBFC166 0%, #EFA2E05E 48%, #4A38CC6E 100%)',
        }}
        className="w-screen h-screen top-0 left-0 absolute -z-10"
      />
      <Layout>
        <div className="flex items-center justify-around gap-6 pt-10">
          <div className="flex flex-col gap-6 max-w-[400px]">
            <div className="flex flex-col gap-2">
              <Logo />
              <h2 className="text-xl font-bold">
                Plataforma de gestion pedagógica para la primera
                educación.
              </h2>
            </div>

            <p>
              Mide los principales indicadores curriculares de los
              niños y niñas en 3 instancias distintas en el año.
              Puedes utilizarlo para nivel sala cuna, prekinder o
              kinder, ya sea estando el sistema educativo o realizando
              homeschool.
            </p>
          </div>

          <div>
            <div className="bg-white border border-accent rounded-md flex flex-col py-20 px-10 gap-10 max-w-[500px]">
              <div>
                <h2 className="text-5xl text-accent font-bold">
                  Hola!
                </h2>
                <p>Ingresa tu información para iniciar sesión.</p>
              </div>

              <form className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label className="text-sm ml-1 font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="bg-lightblue py-3 rounded-md px-3 focus:outline-accent"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm ml-1 font-light">
                    Password
                  </label>
                  <input
                    className="bg-lightblue py-3 rounded-md px-3 focus:outline-accent"
                    type="password"
                    required
                  />
                </div>

                <button
                  onClick={() => {}}
                  className="bg-accent py-3 rounded-md mt-3 flex justify-center items-center gap-4"
                >
                  INICIAR SESIÓN
                </button>
              </form>
              <div className="flex gap-2 justify-between items-center text-accent">
                <span className="w-[150px] h-[1px] bg-accent" />
                O
                <span className="w-[150px] h-[1px] bg-accent" />
              </div>

              <div
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/dashboard',
                  })
                }
                className="border border-accent font-bold py-3 rounded-md mt-3 flex justify-center items-center gap-4"
              >
                <div className="w-8">
                  <Image
                    width="100%"
                    height="100%"
                    src="/google_icon.svg"
                    alt="google icon"
                  />
                </div>
                Iniciar sesión con google
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

//TODO: Make a verification of email to institution mail check this: https://next-auth.js.org/providers/google

export default LoginPage
