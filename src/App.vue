<template>
  <div id="app">
    <div>
      <!-- As a link -->
      <b-navbar variant="dark" type="warning">
        <b-navbar-brand href="#">Ingreso de Usuarios</b-navbar-brand>
      </b-navbar>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">

            <table  id="ingreso">
              <tr>
                <td>Nombre</td>
                <td><input v-model="nameEdit" type="text" /></td>
              </tr>
              <tr>
                <td>Apellido</td>
                <td><input v-model="lastnameEdit" type="text" /></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input v-model="emailEdit" type="email" /></td>
              </tr>
              <button @click="update">Editar</button>
            </table>
          </div>
        </div>
      </div>
    </div>

    <table>
      <tr>
        <td>Nombre</td>
        <td><input v-model="name" type="text" /></td>
      </tr>
      <tr>
        <td>Apellido</td>
        <td><input v-model="lastname" type="text" /></td>
      </tr>
      <tr>
        <td>Corre Electronico</td>
        <td><input v-model="email" type="email" /></td>
      </tr>
      <button @click="create">Agregar</button>
    </table>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ user.data.name }}</td>
          <td>{{ user.data.lastname }}</td>
          <td>{{ user.data.email }}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#exampleModal"
              class="btn btn-warning"
              @click="
                setInformation(
                  user.data.name,
                  user.data.lastname,
                  user.data.email,
                  user.id
                )
              "
            >
              Editar</button
            ><button @click="Delete(user.id)" class="btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loading: true,
      users: [],
      name: "",
      lastname: "",
      email: "",
      nameEdit: "",
      lastnameEdit: "",
      emailEdit: "",
      idEdit: "",
    };
  },
  mounted() {
    this.read();
    // this.create()
    // this.update()
    // this.delete();
  },
  methods: {
    setInformation(name, lastname, email, id) {
      this.nameEdit = name;
      this.lastnameEdit = lastname;
      this.idEdit = id;
      this.emailEdit = email;
    },
    read() {
      firebase
        .firestore()
        .collection("usuarios")
        .onSnapshot((snapshot) => {
          this.users = [];
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.users.push({
              id: doc.id,
              data: doc.data(),
            });
          });
        });
    },
    create() {
      firebase
        .firestore()
        .collection("usuarios")
        .add({
          name: this.name,
          lastname: this.lastname,
          email: this.email,
        })
        .then(() => {
          console.log("Data enviada");
        });
    },
    update() {
      firebase
        .firestore()
        .collection("usuarios")
        .doc(this.idEdit)
        .update({
          name: this.nameEdit,
          lastname: this.lastnameEdit,
          email: this.emailEdit,
        })
        .then(() => {
          console.log("Data enviada");
        });
    },
    Delete(id) {
      firebase
        .firestore()
        .collection("usuarios")
        .doc(id)
        .delete();
    },
  },
};
</script>

<style lang="scss">

#ingreso{
  text-align: left;
display: flex;
justify-content: center;
margin: 10px;
padding: 5px;
}

</style>
