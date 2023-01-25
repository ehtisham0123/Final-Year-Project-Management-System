const db = require("../../models");
const Group = db.groups;
const Op = db.Op;

// Delete a Groups with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Group.destroy({
    where: {  
     [Op.or]: [{student1_id: id}, {student2_id: id}]
	},  
})
    .then((num) => {
         if (num == 1) {
        res.json({
          success: "Group deleted successfully!",
        });
      } else {
        res.json({
          error: `Cannot delete Group Maybe Group was not found!`,
        });
      }
    })
    .catch((err) => {
       res.status(500).send({
        error: "Could not delete Group with id=" + id,
      });
    });
};
