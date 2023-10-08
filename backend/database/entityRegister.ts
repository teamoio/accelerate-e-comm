import { Example } from "../modules/example/example.entity";
import { Person } from "../modules/example/person.entity";

const entityRegistrar = () => [Example, Person];

export default entityRegistrar;
