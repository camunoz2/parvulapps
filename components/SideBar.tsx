import { useQuery } from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TERMS } from '../utils/constants'
import { Curriculum } from '../types/app'
import Link from 'next/link'

interface Props {
  handleStudentList: React.Dispatch<React.SetStateAction<boolean>>
  studentListMenu: boolean
}

const SideBar = ({ handleStudentList, studentListMenu }: Props) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [filter, setFilter] = useState(false)

  useEffect(() => {
    if (
      router.query.grade &&
      router.query.evalType &&
      router.query.categories &&
      router.query.core
    ) {
      setFilter(false)
    }
  }, [router.query])

  const filtersQuery = useQuery(
    ['filters'],
    (): Promise<Curriculum> => {
      return fetch('/api/get-filters', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
    }
  )

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.name === 'categories') {
      // For reseting the cores selector
      router.push({
        pathname: '/evaluar',
        query: {
          ...router.query,
          [event.target.name]: encodeURI(event.target.value),
          core: encodeURI('0'),
        },
      })
    } else {
      router.push({
        pathname: '/evaluar',
        query: {
          ...router.query,
          [event.target.name]: encodeURI(event.target.value),
        },
      })
    }
  }

  const selectStyles =
    'text-xs rounded-md py-3 px-2 bg-white text-dark'

  return (
    <>
      {/* Mobile View */}
      <div className="fixed lg:hidden grid grid-cols-2 items-center z-10 bottom-0 left-0 pt-3 pb-2 px-2 bg-accent text-dark w-full divide-x">
        <div
          onClick={() => setFilter(!filter)}
          className="flex flex-col gap-1 justify-center"
        >
          <Image src="/filter.svg" width={16} height={16} alt="" />
          <p className="text-sm text-center">Filtrar</p>
        </div>
        <div
          onClick={() => handleStudentList(!studentListMenu)}
          className="flex flex-col gap-1 justify-center"
        >
          <Image src="/book_icon.svg" width={16} height={16} alt="" />
          <p
            className={`text-sm text-center ${
              studentListMenu && 'animate-bounce'
            }`}
          >
            {studentListMenu ? 'Cerrar Lista' : 'Elegir Alumno'}
          </p>
        </div>
      </div>

      <div
        className={`absolute lg:relative  lg:block bottom-10 lg:bottom-auto left-0 lg:left-auto ${
          filter ? 'block' : 'hidden'
        }  w-full flex-shrink-0 lg:w-[300px] lg:h-screen bg-accent transition-all`}
      >
        <div>
          <div className="flex items-center gap-2 bg-dark/30 text-white px-4  mb-2 lg:mb-16 py-1 lg:py-6">
            <div className="w-12 h-12 rounded-full bg-white border" />
            <div className=" hidden lg:block">
              <h3 className="font-bold lg:text-xl">
                {session?.user?.name}
              </h3>
              <p
                onClick={() => signOut()}
                className="text-xs font-light hover:text-accent hover:cursor-pointer"
              >
                Cerrar Sesión
              </p>
            </div>
          </div>
          <div className="px-4">
            <form className="flex flex-wrap lg:flex-col gap-4 mb-6">
              <div className="flex flex-col">
                <label className="font-light pl-1">Curso</label>
                <div className="flex gap-1">
                  {filtersQuery.isLoading ? (
                    <p>loading...</p>
                  ) : (
                    <select
                      title="grade selector"
                      name="grade"
                      onChange={handleSelect}
                      className={selectStyles}
                      value={router.query.grade}
                    >
                      {!router.query.grade && (
                        <option>Elige una opcion</option>
                      )}
                      {filtersQuery.data?.grade.map((g) => (
                        <option value={g.id} key={g.id}>
                          {g.classroom} / {g.section}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-light pl-1">
                  Tipo de evaluación
                </label>
                <div className="flex gap-1">
                  <select
                    title="evaluation selector"
                    onChange={handleSelect}
                    name="evalType"
                    className={selectStyles}
                  >
                    {!router.query.evalType && (
                      <option>Elige una opcion</option>
                    )}
                    {TERMS.map((t) => {
                      return (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-light pl-1">Ámbito</label>
                <div className="flex gap-1">
                  <select
                    title="category selector"
                    onChange={(event) => handleSelect(event)}
                    name="categories"
                    className={selectStyles}
                  >
                    {!router.query.categories && (
                      <option>Elige una opcion</option>
                    )}
                    {filtersQuery.data?.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-light pl-1">Núcleo</label>
                <div className="flex gap-1">
                  <select
                    title="core selection"
                    onChange={handleSelect}
                    name="core"
                    className={selectStyles}
                  >
                    {(!router.query.core ||
                      router.query.core === '0') && (
                      <option>Elige una opcion</option>
                    )}

                    {filtersQuery.data?.cores
                      .filter(
                        (core) =>
                          core.categoryId ===
                          parseInt(router.query.categories as string)
                      )
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.description}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Link href="/configurar">
          <div className="px-4 hidden lg:flex gap-1 justify-self-end rounded-md py-4 hover:cursor-pointer">
            <Image
              width={24}
              height={24}
              src="/settings_icon.svg"
              alt=""
            />
            <p>Configuración</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default SideBar
