# Навигация
- [Стак](#стак)
- [Команды и начало работы](#команды-и-начало-работы)
- [Предустановленные пакеты](#предустановленные-пакеты)
- [Структура проекта](#структура-проекта)
    - [Actions](#actions)
    - [Components](#components)
    - [Containers](#containers)
    - [Models](#models)
    - [Sources](#sources)
    - [Store](#store)
    - [Utils](#utils)
- [Структура компонента](#структура-компонента)
# Стак
- Create React App boilerplate with --typescript flag ([doc](https://github.com/facebook/create-react-app#create-react-app--))
- React Router ([doc](https://reacttraining.com/react-router/web/example/basic))
- React Redux ([doc](https://github.com/reduxjs/react-redux#react-redux))
- Axios ([doc](https://github.com/axios/axios#axios))
- Sass ([doc](https://sass-lang.com/guide))
- Enzyme ([doc](https://airbnb.io/enzyme/))
- Ant Design ([doc](https://ant.design/docs/react/introduce))

# Команды и начало работы
Перед началом работы создайте и заполните `.env` по примеру `.env.example`.

Запуск локального сервера разработки (development)
`npm start` or `yarn start`
Сборка билда (production)
`npm run build` or `yarn build`

больше информации о командах можно найти [тут](https://github.com/facebook/create-react-app#npm-start-or-yarn-start).

# Предустановленные пакеты
- moment ([doc](https://www.npmjs.com/package/moment))
- lodash ([doc](https://www.npmjs.com/package/lodash))
- classnames ([doc](https://www.npmjs.com/package/classnames))
- node-sass ([doc](https://www.npmjs.com/package/node-sass))
- normalize.css ([doc](https://www.npmjs.com/package/normalize.css))

Это необходимые пакеты большинство из котрых присутвуют во всех наших проектах.
# Структура проекта<a id="project-structure"></a>
![](https://drive.google.com/uc?authuser=0&id=1rgZJo2Y0TKMtyetvOMLKaFy3LBoBduOQ&export=download)
- [src/actions](#actions)
- [src/components](#components)
- [src/components/PrivateRoute](#srccomponentsprivateroute)
- [src/containers](#containers)
- [src/containers/Public/App/index.tsx](#srccontainerspublicappindexjsx)
- [src/models](#models)
- [src/sources](#sources)
- [src/sources/styles/styles.scss](#srcsourcesstylesstylesscss)
- [src/sources/styles/variables.scss](#srcsourcesstylesvariablesscss)
- [src/utils](#utils)
- [src/config.ts](#srcconfigjs)
- [src/index.tsx](#srcindexjs)
- [.env.example](#envexample)
- [.eslintrc](#eslintrc)
- [.prettierrc](#prettierrc)
- [tsconfig.json](#tsconfig.json)

##### Actions
Предназначено для работы со сторонними ресурсами (например API) и состоянием приложения.

В большенстве случаев список файлов экшенов соответсвует сущностям из API проекта. В примере используется тестовое REST API [jsonplaceholder](https://jsonplaceholder.typicode.com/) которое имеет следующие сущности: posts, comments, users и другие. Согласно этим сущностям наша папка отвечает этим сущностям. Благодаря такому подходу легко работать с API и состоянием проекта так как все методы четко разбиты по сущностям.

Также этот подход предполагает что экшены будут импортированы на прямую с целевых компонентов без передачи их в функцию connect пакета react-redux.

Типичный пример такого экшена
```typescript
// import axios instace
import { api } from '../config'
// import action types
import { actionTypes as usersActionTypes } from 'reducers/users'
import { actionTypes as userActionTypes } from 'reducers/user'
//import models
import { IUser } from 'models/user'
// import store for interact with redux
import store from 'utils/store'

// common http request
export async function getUser(id: number): Promise<IUser> {
  let res = await api.get(`/users/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch user by id ${id}`)

  return res.data
}

// http request + redux store
export async function getUsers(): Promise<void> {
  let res = await api.get('/users')
  if (res.status !== 200) throw new Error(`Can't fetch user list`)

  store.dispatch({ type: usersActionTypes.SET, payload: res.data })
}

// common redux action
export function setUser(user: IUser): void {
  store.dispatch({ type: userActionTypes.SET, payload: user })
  localStorage.setItem('user', JSON.stringify(user))
}
```
##### Components
Предназначено для компонентов которые используются в дувух или более различных компонентах проекта. Например это могут быть хедер, футер, приватный роут и так далее.

Такие компоненты обязательно должны иметь описание параметров с помощью Prop Types в случае если эти компоненты принимают параметры.
###### `src/components/PrivateRoute`
Приватный роут предназначен для закрытых частей приложения которые требуют авторизации или определенных параметров пользователя.
##### Containers
Предназначено для компонентов которые разделены по роутам проекта. Содержит такие компоненты как App, Admin, Public и другие если необходимо. Имеют неограниченную вложенность компонентов.

Разделение на `Public, Admin и тд.` зависит от проекта, этого разделения может не быть если приложение выполняте 1 функцию и имеет только скрытый контент или только публичный.

Компонент `App` является точкой входа в приложение которая обязательна для любого проекта.

Несколько примеров
- Компонент отвечающий за публичную страницу с постом по пути `/post/1` беудет находится в `src/containers/Public/Post`
- Компонент отвечающий за приватную страницу списка пользователей по пути `/admin/users` беудет находится в `src/containers/Admin/Users`

###### `src/containers/Public/App/index.tsx`
Точка входа в приложение, в котором необходимо инициализировать приложение, подключать библиотеки конфигов, провайдеров.

Если приложение имеет авторизацию, необходимо получить данные о текущем пользователе перед отображением роутера дабы избежать несвоевременных редиректов.
##### Models
Предназначена для описания интрфейсов сущностей

Пример интерфейса

```typescript
export interface IPost {
  body: string
  id: number
  title: string
  userId: number
}
```
##### Sources
Предназначена для шрифтов, картинок, стилей и другого медиа контента, которые должны находиться только в этой папке (по компонентам не раскидывать) 
###### `src/sources/styles/styles.scss`
Предназначин для разметки каркаса приложения, общих стилей приложения таких как определение шрифта, его размера, цвета фона и так далее.
###### `src/sources/styles/variables.scss`
Предназначен для определения переменных стилей таких как цвета проекта (палитра), шрифты, размеры. Также хранит в себе общие миксины и функции.

Необходимо использовать общее переменные в стилях компонентов избегая дублей одних и тех же стилей.

##### Utils
Предназачно для содержания кастомного функционала (не компонентов) которые относятся к одному или более компонентам.

Это могут быть различные функции сортировки, переназначения стандартных функций типов, работа с историей роутов проекта и т.д.

Например история роутов которая доступна в компонентах проекта с помощью Router но недоступна например в экшенах и другом функционале не являющихся компонентами в роутере.
```typescript
import createBrowserHistory from 'history/createBrowserHistory'
export default createBrowserHistory()
```
Или сортировка массива объектов по id
```typescript
export function sortById(asc: boolean): Array<T> {
    return asc ? a.id - b.id : b.id - a.id
}
```

###### `src/config.ts`
Предназначен для конфигурирования пакетов при инициализации проекта и определения общих констант приложения
###### `src/index.ts`
Предназначен для рендера приложения и подключения стилей UI фреймвоков и других пакетов.
###### `.env.example`
Содержит переменные окружения такие как
- Адреса и порты подключеня к API
- API ключи сторонних сервиов
- Пароли
- Персональные данные

После клонирования проекта необходимо создать и заполнить `.env` файл согласно примеру `.env.example`.
###### `.eslintrc`
Предназначена для конфигурации линтера. Может меняться по соглашению команды проекта.
```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "jsx": true,
    "useJSXTextNode": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    "@typescript-eslint/explicit-member-accessibility": ["error", {
      "accessibility": "no-public"
    }],
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "prettier/prettier": "error"
  }
}
```
###### `.prettierrc`
Конфигрурация притера (плагина для линтера). Может меняться по соглашению команды проекта.
```json
{
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "tabWidth": 2,
  "arrowParens": "avoid",
  "semi": false
}
```
# Структура компонента<a id="component-structure"></a>
Компонент должен иметь разделение на 3 логических части.
1. Шапка компонента
2. Тело компонента
3. Экспорт компонента

##### Шапка компонента
Содержит импорт необходимых компонентов, библиотек, стилей, медиа, типов и определение констант. Порядок должен быть таким
1. Компоненты, библиотеки и утилиты
2. Экшены и модели(типы)
3. Стили и медиа
4. Описание интерфейсов для реквизитов и состояния
5. Определение констант
```typescript
// components and utils
import React, { Component } from 'react'
import { notification, message, Icon, PageHeader } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import history from 'utils/history'

// actions and models
import * as usersActions from 'actions/users'
import * as postsActions from 'actions/posts'
import * as commentsActions from 'actions/comments'
import { IUser, IComment, IPost } from 'models'

// styles and images
import styles from './styles.module.scss'
import logo from 'sources/images/logo.png'

// declare interfaces
interface IState {
  loading: boolean
  posts: IPost[]
}
interface IProps {
  prefix: string
  defState?: IState
}

// define constants
const initState = { foo: 'bar' }
const tabs = ['Tab One', 'Tab two', 'Tab three']
```
##### Тело компонента
###### `Функциональные компоненты`
Содержит переменные, функции и return в таком же порядке.
```typescript
import React from 'react'

export default function SomeComponent(props: { prop: string }): React.ReactElement {
    let foo = 'bar'
        
    function lower(text: string) {
        return text.toLowerCase()
    }
    
    return <span>{lower(`This functional component have ${foo} and ${prop}`)}</span>
}
```
###### `Классовые компоненты`
Содержит такие части в указаном порядке
1. Переменные, геттеры и сеттеры
2. Функции жизненного цикла компонента (начиная с constructor)
3. Функции компонента
4. Render функция
```typescript
class SomeComponent extends Component<IProps, IState> {
    state: IState = {
        loading: false,
        posts: []
    }
    isMounted = false
    
    constructor(props: IProps) {
        super(props)
        
        this.state = props.defState ? _.cloneDeep(defState) : {}
        this.used = false
    }
    
    componentDidMount = () => {
        this.loadPosts()
    }
    
    shouldComponentUpdate = (nextProps: IProps) => {
        return this.props.prop !== nextProps.prop
    }
    
    onClickRefresh = () => {
        this.loadPosts()
    }
    
    loadPosts = async () => {
        this.setState({ loading: true })
    
        try {
            let posts = await postsActions.getPosts()
            this.setState({ posts })
        } catch (e) {
            message.error(e.message)
        } finally {
            this.setState({ loading: false })
        }
    }
    
    render = () => {
        let { posts } = this.state
        const { prefix } = this.props
        
        posts = posts.map(post => ({ ...post, title: prefix + post.title }))
        
        return (
            <div>
                {posts.map(post => <PostItem key={post.id} {...post} />)}
                <Button onClick={this.onClickRefresh}>Refresh posts</Button>
            </div>
        )
    }
}
```
##### Экспорт компонента
Если компонент не нуждается в оборачивании в какие либо HOC'и (прим. connect или withRouter) эго нужно экспортировать по-умолчанию
```typescript
export default SomeComponent
```
Если компонент нужно обернуть и обертки имеют входные параметры их нужно писать непосредственно в параметре без создания дополнительных функций или констант (прим. mapPropsToState для connect)
```typescript
export default connect(state: IStoreState => ({
    user: state.user,
    posts: state.posts,
}))(SomeComponent)
// or few wrappers
export default withRouter(
    connect(state: IStoreState => ({
        user: state.user,
        posts: state.posts,
    }))(SomeComponent)
)
```
Если структура стора содержит большую вложенность можно использовать селекторы которые должны быть расположены рядом с actionTypes в редьюсере.
```typescript
// reducer
export const postsSelector = (state: IStoreState): List => state.deep.chain.posts.list

// component
import { postsSelector } from 'store/reducers/posts'

export default connect(state: IStoreState => ({
    user: postsSelector(state),
    posts: state.posts,
}))(SomeComponent)
```
