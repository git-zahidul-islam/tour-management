import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";


const divisionSchema = new Schema<IDivision>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String }
}, {
    timestamps: true
})

divisionSchema.pre("save", async function (next) {
    if (this.isModified(this.name)) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}`

        let counter = 0;
        while (await Division.exists({ slug })) {
            slug = `${slug}-${counter++}` // dhaka-division-2
        }

        this.slug = slug;
    }

    next();
});

divisionSchema.pre("findOneAndUpdate", async function (next) {
    const divisiton = this.getUpdate() as Partial<IDivision>;

    if (divisiton.name) {
        if (divisiton.name) {
            const baseSlug = divisiton.name.toLowerCase().split(" ").join("-")
            let slug = `${baseSlug}`

            let counter = 0;
            while (await Division.exists({ slug })) {
                slug = `${slug}-${counter++}` // dhaka-division-2
            }

            divisiton.slug = slug
        }
    };

    this.setUpdate(divisiton);

    next();
})

export const Division = model<IDivision>("Division", divisionSchema)