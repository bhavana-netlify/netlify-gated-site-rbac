<template>
  <div id="footer">
    <div>
      <a href="https://login-to-gated-site.netlify.com">Back to Login Site</a>
    </div>
    <div><a href="/.netlify/functions/delete-cookie">Delete Cookie</a></div>
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
