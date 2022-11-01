# AI Evaluation

## 1, About

- Evaluate accuracy of AI models
- Nodejs, Expressjs, Reactjs, Material UI,...

## 2, Install libraries

Run command **```npm install```** to install all libraries used in this project

## 3, Error code

- ```200```: **```OK. No errors occurred.```**
- ```400```: **```Error. Missing input(s) values.```**
- ```400```: **```Error. Duplicated infomations.```**
- ```401```: **```Error. Unauthenticated.```**
- ```403```: **```Error. Forbidden.```**
- ```404```: **```Error. Infomation(s) not found.```**
- ```500```: **```Error. Something went wrong```**

## 4, Setup database

- Create a blank database
- Update your database infomations in 2 files **```src/config/connectDB.js```**, **```src/models/index.js```**
![Connect to database!](./assets/connect_database.png "Connect to database")
- Run the command **```node src/config/setupDB```** to create all tables in database
- Database E-R diagram:![ERD!](./assets/ERD.png "ERD")
- Enities:
  - ```User``` : Infomations of user, has role: **```admin```**, **```user```**, **```superAdmin```**
  - ```Problem``` : Infomations of problems
  - ```Group``` : Type of problems
  - ```SubGroup``` : Small problem types in each groups
  - ```Submission``` : Log the infomations of each submission
  - ```Dataset``` : Dataset was used each problem

## 5, Run project

- **```npm start```**: Run project with hot reload
- **```npm run format```**: Format the project with the structure described in file **```package.json```**
- **```npm run dev```**: Format + run project with hot reload

## 6, APIs

> ***```GET```: Get***
>
> ***```POST```: Add***
>
> ***```PUT```: Update***
>
> ***```DELETE```: Delete***
------

> ***```User+```: Need to be a user or higher***
>
> ***```Admin+```: Need to be an administrator or higher***
>
> ***```Superadmin```: Need to be a super administrator***

### 6.1, Authentication, authorization

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **None** | **```/api/v1/auth/register```** | Register |
| **None** | **```/api/v1/auth/login```** | Login |

### 6.2, User, admin, superadmin

#### 6.2.1, User

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/users/add```** | Add new user |
| **User+** | **```/api/v1/users/delete/:userId```** | Delete user by id |
| **User+** | **```/api/v1/users/edit/:userId```** | Update user by id |
| **User+** | **```/api/v1/users/:userId```** | Get user by id |
| **Admin+** | **```/api/v1/users```** | Get all users |

#### 6.2.2, Admin

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **Superadmin** | **```/api/v1/admins/add```** | Add new admin |
| **Admin+** | **```/api/v1/admins/delete/:userId```** | Delete admin by id |
| **Admin+** | **```/api/v1/admins/edit/:userId```** | Update admin by id |
| **Admin+** | **```/api/v1/admins/:userId```** | Get admin by id |
| **Superadmin** | **```/api/v1/admins```** | Get all admins |

#### 6.2.3, Superadmin

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **Superadmin** | **```/api/v1/superadmins/:userId```** | Get superadmin by id |
| **Superadmin** | **```/api/v1/superadmins/delete/:userId```** | Delete superadmin by id |
| **Superadmin** | **```/api/v1/superadmins/edit/:userId```** | Update superadmin by id |

### 6.3, Problem

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/problems/add```** | Add new problem |
| **Admin+** | **```/api/v1/problems/delete/:problemId```** | Delete problem by id |
| **Admin+** | **```/api/v1/problems/edit/:problemId```** | Update problem by id |
| **User+** | **```/api/v1/problems/groups/:groupId```** | Get all problems by group id |
| **User+** | **```/api/v1/problems/groups/:groupId/subgroups/:subGroupId```** | Get all problems by group and subGroup id |
| **User+** | **```/api/v1/problems/:problemId```** | Get problem by id |
| **User+** | **```/api/v1/problems/groups```** | Get all problems |

### 6.4, Dataset

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/datas/add```** | Add new dataset. |
| **Admin+** | **```/api/v1/datas/delete/datasetId```** | Delete dataset by id |
| **Admin+** | **```/api/v1/datas/edit/datasetId```** | Update dataset by id |
| **User+** | **```/api/v1/datas/groups/:groupId```** | Get all datasets by group id |
| **User+** | **```/api/v1/datas/groups/:groupId/subgroups/:subGroupId```** | Get all datasets by group and subGroup id |
| **User+** | **```/api/v1/datas/problems/:problemId```** | Get all datasets by problem id |
| **User+** | **```/api/v1/datas/:datasetId```** | Get dataset by id |
| **User+** | **```/api/v1/datas```** | Get all datasets |

### 6.5, Group, SubGroup

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/groups/add```** | Add new group |
| **Admin+** | **```/api/v1/groups/delete/:groupId```** | Delete group by id |
| **Admin+** | **```/api/v1/groups/edit/:groupId```** | Update group by id |
| **Admin+** | **```/api/v1/groups/:groupId/subgroups/add```** | Add new subGroup |
| **Admin+** | **```/api/v1/groups/:groupId/subgroups/delete/:subGroupId```** | Delete subGroup by group and id |
| **Admin+** | **```/api/v1/groups/:groupId/subgroups/edit/:subGroupId```** | Update subGroup by group and id |
| **User+** | **```/api/v1/groups/:groupId/subgroups/:subGroupId```** | Get subGroup by group and id |
| **User+** | **```/api/v1/groups/:groupId/subgroups```** | Get all subGroups by group id |
| **User+** | **```/api/v1/groups/:groupId```** | Get group by id |
| **User+** | **```/api/v1/groups```** | Get all groups |

### 6.6, Submission

| Authorization | URL | Description |
| ----------- | ----------- | ----------- |
| **User+** | **```/api/v1/submissions/add```** | Add new submission |
| **Admin+** | **```/api/v1/submissions/delete/:submissionId```** | Delete submission by id |
| **User+** | **```/api/v1/submissions/edit/:submissionId```** | Update submission by id |
| **Admin+** | **```/api/v1/submissions/groups/:groupId```** | Get all submissions by group id |
| **Admin+** | **```/api/v1/submissions/groups/:groupId/subgroups/:subGroupId```** | Get all submissions by group and subGroup id |
| **Admin+** | **```/api/v1/submissions/problems/:problemId```** | Get all submissions by problem id |
| **User+** | **```/api/v1/submissions/users/:userId```** | Get all submissions by user id |
| **User+** | **```/api/v1/submissions/:submissionId```** | Get submission by id |
| **Admin+** | **```/api/v1/submissions```** | Get all submission |
