import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TERMS } from '../pages/evaluar'
import { Curriculum, Filter } from '../types/app'

interface Props {
  filter: Filter | null
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
}

const SideBar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)

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
    router.push({
      pathname: '/evaluar',
      query: {
        ...router.query,
        [event.target.name]: encodeURI(event.target.value),
      },
    })
  }

  const selectStyles = 'bg-[#2D646533] text-xs rounded-md py-2 px-2'

  useEffect(() => {
    if (
      router.query.grade &&
      router.query.evalType &&
      router.query.categories &&
      router.query.core
    ) {
      setOpen(false)
    }
  }, [router.query])

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={`fixed lg:hidden flex justify-center z-10 bottom-0 left-0 py-2 px-2 bg-accent text-white w-full`}
      >
        <img src="/add_people_icon.svg" alt="" className="h-6" />
      </div>
      <div
        className={`absolute lg:relative  lg:block bottom-10 lg:bottom-auto left-0 lg:left-auto ${
          open ? 'block' : 'hidden'
        }  w-full flex-shrink-0 lg:w-[300px] lg:h-screen bg-gradient-to-br from-[#83bdbe] to-[#66c5c2] transition-all`}
      >
        <div>
          <div className="flex items-center gap-2 bg-gradient-to-bl from-[#2D646533] to-[#0EADA712] bg-blend-lighten px-4  mb-2 lg:mb-16 py-1 lg:py-6">
            <img className="w-12 h-12 rounded-full bg-white border" />
            <div className="text-dark hidden lg:block">
              <h3 className="font-bold lg:text-xl">
                {session?.user?.name}
              </h3>
              <p className="text-xs font-light">Cerrar Sesión</p>
            </div>
          </div>
          <div className="px-4">
            <form className="flex flex-wrap lg:flex-col gap-4 mb-6">
              <div className="flex flex-col">
                <label className="font-light text-sm pl-1">
                  Curso
                </label>
                <div className="flex gap-1">
                  {filtersQuery.isLoading ? (
                    <p>loading...</p>
                  ) : (
                    <select
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
                <label className="font-light text-sm pl-1">
                  Tipo de evaluación
                </label>
                <div className="flex gap-1">
                  <select
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
                <label className="font-light text-sm pl-1">
                  Ámbito
                </label>
                <div className="flex gap-1">
                  <select
                    onChange={handleSelect}
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
                <label className="font-light text-sm pl-1">
                  Núcleo
                </label>
                <div className="flex gap-1">
                  <select
                    onChange={handleSelect}
                    name="core"
                    className={selectStyles}
                  >
                    {!router.query.core && (
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

        <div className="px-4 hidden lg:flex gap-1 justify-self-end pt-32">
          <img className="w-4" src="/settings_icon.svg" alt="" />
          <p>Configuración</p>
        </div>
      </div>
    </>
  )
}

export default SideBar
