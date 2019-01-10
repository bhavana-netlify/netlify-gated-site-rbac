<template>
  <div id="footer">
    <div>
      <a href="https://festive-brown-c3df1a.netlify.com">Back to Login Site</a>
    </div>
    <button @click="deleteCookie">Delete Cookie</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Footer",
  methods: {
    deleteCookie: async function() {
      // do some deletion
      await axios.get("/.netlify/functions/delete-cookie");
    }
  }
};
</script>
