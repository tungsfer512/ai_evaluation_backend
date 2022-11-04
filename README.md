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

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **None** | **```/api/v1/auth/register```** | **```username```: *string*** <br/> **```password```: *string*** <br/> **```email```: *string*** <br/> **```firstName```: *string*** <br/> **```lastName```: *string*** | Register |
| **None** | **```/api/v1/auth/login```** | **```username```: *string*** <br/> **```password```: *string*** | Login |

### 6.2, User, admin, superadmin

#### 6.2.1, User

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/users/add```** | **```username```: *string*** <br/> **```password```: *string*** <br/> **```email```: *string*** <br/> **```firstName```: *string*** <br/> **```lastName```: *string*** | Add new user |
| **User+** | **```/api/v1/users/delete/:userId```** | None | Delete user by id |
| **User+** | **```/api/v1/users/edit/:userId```** | **```password```: *string*** <br/> **```email```: *string*** <br/> **```firstName```: *string*** <br/> **```lastName```: *string*** | Update user by id |
| **User+** | **```/api/v1/users/:userId```** | None | Get user by id |
| **Admin+** | **```/api/v1/users```** | None | Get all users |

#### 6.2.2, Admin

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **Superadmin** | **```/api/v1/admins/add```** | **```username```: *string*** <br/> **```password```: *string*** <br/> **```email```: *string*** <br/> **```firstName```: *string*** <br/> **```lastName```: *string*** | Add new admin |
| **Admin+** | **```/api/v1/admins/delete/:userId```** | None | Delete admin by id |
| **Admin+** | **```/api/v1/admins/edit/:userId```** | **```password```: *string*** <br/> **```email```: *string*** <br/> **```firstName```: *string*** <br/> **```lastName```: *string*** | Update admin by id |
| **Admin+** | **```/api/v1/admins/:userId```** | None | Get admin by id |
| **Superadmin** | **```/api/v1/admins```** | None | Get all admins |

#### 6.2.3, Superadmin

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **Superadmin** | **```/api/v1/superadmins/:userId```** | None | Get superadmin by id |
| **Superadmin** | **```/api/v1/superadmins/delete/:userId```** | None | Delete superadmin by id |
| **Superadmin** | **```/api/v1/superadmins/edit/:userId```** | **```password```: *string*** <br/> **```email```: *string*** <br/> **```firstName```: *string*** <br/> **```lastName```: *string*** | Update superadmin by id |

### 6.3, Problem

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/problems/add```** | **```title```: *string*** <br/> **```description```: *string*** <br/> **```inputDescription```: *string*** <br/> **```outputDescription```: *string*** <br/> **```groupId```: *string*** <br/> **```subGroupId```: *string*** | Add new problem |
| **Admin+** | **```/api/v1/problems/delete/:problemId```** | None | Delete problem by id |
| **Admin+** | **```/api/v1/problems/edit/:problemId```** | **```title```: *string*** <br/> **```description```: *string*** <br/> **```inputDescription```: *string*** <br/> **```outputDescription```: *string*** <br/> **```groupId```: *string*** <br/> **```subGroupId```: *string*** | Update problem by id |
| **User+** | **```/api/v1/problems/groups/subgroups/:subGroupId```** |  | Get all problems by subGroup id |
| **User+** | **```/api/v1/problems/groups/:groupId```** | None | Get all problems by group id |
| **User+** | **```/api/v1/problems/:problemId```** | None | Get problem by id |
| **User+** | **```/api/v1/problems/groups```** | None | Get all problems |

### 6.4, Dataset

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/datas/add```** | **```title```: *string*** <br/> **```path```: *string*** <br/> ```description```: *string* <br/> **```problemId```: *string*** | Add new dataset. |
| **Admin+** | **```/api/v1/datas/delete/datasetId```** | None | Delete dataset by id |
| **Admin+** | **```/api/v1/datas/edit/datasetId```** | **```title```: *string*** <br/> **```path```: *string*** <br/> ```description```: *string* <br/> **```problemId```: *string*** | Update dataset by id |
| **User+** | **```/api/v1/datas/groups/subgroups/:subGroupId```** | None | Get all datasets by group and subGroup id |
| **User+** | **```/api/v1/datas/groups/:groupId```** | None | Get all datasets by group id |
| **User+** | **```/api/v1/datas/problems/:problemId```** | None | Get all datasets by problem id |
| **User+** | **```/api/v1/datas/:datasetId```** | None | Get dataset by id |
| **User+** | **```/api/v1/datas```** | None | Get all datasets |

### 6.5, Group, SubGroup

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **Admin+** | **```/api/v1/groups/add```** | **```title```: *string*** <br/> ```description```: *string* | Add new group |
| **Admin+** | **```/api/v1/groups/delete/:groupId```** | None | Delete group by id |
| **Admin+** | **```/api/v1/groups/edit/:groupId```** | **```title```: *string*** <br/> ```description```: *string* | Update group by id |
| **Admin+** | **```/api/v1/groups/subgroups/add```** | **```title```: *string*** <br/> ```description```: *string* <br/> **```groupId```: *string*** | Add new subGroup |
| **Admin+** | **```/api/v1/groups/subgroups/delete/:subGroupId```** | None | Delete subGroup by group and id |
| **Admin+** | **```/api/v1/groups/subgroups/edit/:subGroupId```** | **```title```: *string*** <br/> ```description```: *string* <br/> **```groupId```: *string*** | Update subGroup by group and id |
| **User+** | **```/api/v1/groups/subgroups/:subGroupId```** | None | Get subGroup by group and id |
| **User+** | **```/api/v1/groups/subgroups```** | None | Get all subGroups |
| **User+** | **```/api/v1/groups/:groupId```** | None | Get group by id |
| **User+** | **```/api/v1/groups```** | None | Get all groups |

### 6.6, Submission

| Authorization | URL | Body | Description |
| ----------- | ----------- | ----------- | ----------- |
| **User+** | **```/api/v1/submissions/add```** | ```accuracyModel```: *double* <br/> ```accuracyTest```: *double* <br/> ```excutionTime```: *double* <br/> ```excutionMemories```: *double* <br/> ```status```: *string* <br/> ```description```: *string* | Add new submission |
| **Admin+** | **```/api/v1/submissions/delete/:submissionId```** | None | Delete submission by id |
| **User+** | **```/api/v1/submissions/edit/:submissionId```** | ```accuracyModel```: *double* <br/> ```accuracyTest```: *double* <br/> ```excutionTime```: *double* <br/> ```excutionMemories```: *double* <br/> ```status```: *string* <br/> ```description```: *string* | Update submission by id |
| **Admin+** | **```/api/v1/submissions/groups/subgroups/:subGroupId```** | None | Get all submissions by subGroup id |
| **Admin+** | **```/api/v1/submissions/groups/:groupId```** | None | Get all submissions by group id |
| **Admin+** | **```/api/v1/submissions/problems/:problemId```** | None | Get all submissions by problem id |
| **User+** | **```/api/v1/submissions/users/:userId```** | None | Get all submissions by user id |
| **User+** | **```/api/v1/submissions/:submissionId```** | None | Get submission by id |
| **Admin+** | **```/api/v1/submissions```** | None | Get all submission |
