

/*interface PizzaToUpdate {
  title?: string;
  content?: string;
}
*/
interface Film {
  id: number;
  title: string;
  director: string;
  duration:number;
  budget:number|undefined;
  description:string|undefined;
  imageUrl:string|undefined;
}

type NewFilm =Omit< Film,"id">;

export type {Film, NewFilm };
