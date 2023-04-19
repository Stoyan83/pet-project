<template>
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Something went wrong!
          </slot>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            Default body message
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            Please try again!
          </slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BaseModal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style >
/* Modal backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal container */
.modal {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px;
  margin: 2em auto;
}

/* Modal header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
  background-color: #2b3b49;
  color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

/* Modal title */
.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
}

/* Modal close button */
.modal-close {
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 1rem; /* Added margin */
  transition: all 0.2s ease-in-out;
}

.modal-close:hover {
  color: #d9d9d9;
}

/* Modal body */
.modal-body {
  padding: 1.5em;
}

/* Modal footer */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
  background-color: #2b3b49;
  color: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Modal action button */
.modal-action {
  color: #fff;
  background-color: #1abc9c;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.modal-action:hover {
  background-color: #16a085;
}
</style>
