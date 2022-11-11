import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { TERMS } from '../pages/evaluar'
import { Curriculum, Filter } from '../types/app'

interface Props {
  filter: Filter | null
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
}

const SideBar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
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

  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col justify-between h-screen overflow-hidden bg-gradient-to-br from-[#2D646533] to-[#0EADA712]">
      <div>
        <div className="flex items-center gap-2 bg-gradient-to-bl from-[#2D646533] to-[#0EADA712] bg-blend-lighten px-4 mb-16 py-6">
          <img className="w-12 h-12 rounded-full bg-white border" />
          <div className="text-dark">
            <h3 className="font-bold text-xl">
              {session?.user?.name}
            </h3>
            <p className="text-xs font-light">Cerrar Sesión</p>
          </div>
        </div>
        <div className="px-4">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-light text-sm pl-1">Curso</label>
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

      <div className="px-4 flex gap-1 justify-self-end pb-16">
        <img className="w-4" src="/settings_icon.svg" alt="" />
        <p>Configuración</p>
      </div>
    </div>
  )
}

export default SideBar
