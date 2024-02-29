![Logo](https://cs.intelix.biz/logo/pic.png "InteliX")

# Nombre de aplicación

Interfaz SFL-AFV AWS

## v-0.1.1

## 1. Introducción.

Interfaz SFL-AFV AWS
(estructura de proyecto IaC definda por Andres Blanca con aporte de Kevin Essa)

## 2. Funcionalidad.

## 3. Tipos de conexión.

## 4. Generalidades sobre la implementación.

Proyecto desarrollado en AWS con IaC configurada con SAM CloudFormation

Estructura base del proyecto

    ├── infrastructure
    │
    ├── README.md
    ├── samconfig.toml
    ├── src
    │   ├── lambdas
    │   │
    │   └── layers
    │       ├── custom
    │       └── third-party
    └── template.yaml

**template.yaml**
Es el archivo principal del proyecto cual contiene todos los stacks definidos para el proyecto

**samconfig.toml**
Contiene la configuracion de despliegue en AWS del stack

Dentro de **src** tenemos 2 directorios

**lambdas**
Contiene el codigo de las funciones lambdas pertenecientes a la aplicación, separado por microservicio y cada directorio de cada funcion lambda es identificado en el nombre de la funcion lambda

**layers**
Contiene los layers de funciones lambdas que solo utiliza la aplicación

**infrastructure**
Contiene los templates de IaC de los recursos definidos (API, layers, microservicios), en cada microservicio podemos conseguir la siguiente estructura con los tipos de recursos necesarios para el microservicio,
su archivo principal es el **template.yml**

     ├── events.yml
     ├── lambdas.yml
     ├── lambdaTriggers.yml
     ├── logs.yml
     ├── sns.yml
     ├── sqs.yml
     └── template.yml

El template principal de cada microservicio es **template.yml** este tendra definido todos los otros templates de recursos necesarios en el microservicio

## 5. Configuración y Despliegue.

Se debe contar con SAM instalado

### 5.1. Prerrequisitos.

Si se esta utilizando VSC utilizar las siguientes extensiones para tener un codigo mas legible y poder tener los snippets de los recursos en AWS

- 1 Name: Prettier - Code formatter
  Id: esbenp.prettier-vscode
  Description: Code formatter using prettier
  Publisher: Prettier
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

- Name: CloudFormation Snippets
  Id: dannysteenman.cloudformation-yaml-snippets
  Description: This extension adds snippets for all the AWS CloudFormation resources into Visual Studio Code.
  Publisher: Danny Steenman
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dannysteenman.cloudformation-yaml-snippets

- 3 Name: AWS Toolkit
  Id: amazonwebservices.aws-toolkit-vscode
  Description: Amazon Web Services toolkit for browsing and updating cloud resources
  Publisher: Amazon Web Services
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode

Para poder hacer pruebas en AWS y en local

- AWS CLI
  https://aws.amazon.com/es/cli/

- SAM
  https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

### 5.2. Instalación y configuración.

Paso a paso a seguir para la instalación propiamente de la aplicación, como por ejemplo:

1. Clonar el repositorio con `git`.
2. Cualquier cambio respectivo en una funcion lambda, debe realizarse en el directorio correspondiente a la misma, contenido dentro de **src/lambdas/**
3. si se necesita agregar algun recurso o nuevo microservicio, agregar los templates necesarios dentro de su respectivo directorio en **infrastructure**
4. Si se desea agregar un layer de node, se debe ejecutar `npm i` en local dentro de donde se vaya a definir dicho layer
5. ejecutar `sam build` cuando se hayan realizado los cambios, para corroborar que no exista algun error de sintaxis en el stack

### 5.3. Configuración de base de datos.

En esta sección se especificará cualquier cambio, configuración, instalación que se requiera a nivel de base de datos, permisos especiales, acceso a scripts de cración y llenado de datos, etc.

### 5.4. Ejecución.

se debe contar con los paquetes sam y aws cli instalados previamente y los permisos correspondientes en su equipo local y en la nube para poder desplegar cambios con el stack con el comando

    sam deploy

### 5.5. Resolución de problemas.

Cualquier problema con el despliegue del stack la terminal debe arrojar por que fallo y de existir previamente desplegado el stack generara un rollback a la version previa estable del mismo

Comunmente los problemas son de tipeo de nombres en los recursos o de falta de permismos para acceder a determinados recursos, el primero se puede solucionar facilmente idenfificando que recurso esta mal definido en alguna invocacion, el segundo problema debe comunicarse directamente con el personal encargado de asignar permisos en la cuenta de AWS que se este usando
