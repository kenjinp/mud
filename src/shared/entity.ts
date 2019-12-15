export type Component = {
  type: string;
  uuid: string;
  components: {
    [type: string]: Component[];
  };
};
