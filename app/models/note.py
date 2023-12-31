from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Note(db.Model):
    __tablename__ ="notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Keys: ID, Text, Created At
    # --------------------------------------------------
    id = db.Column(db.Integer,primary_key = True)

    patient_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("patients.id")),
        nullable=False,
        )
    title = db.Column(db.String(50),server_default="Note")
    text = db.Column(db.Text(),nullable=False)
    created_at =  db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    # --------------------------------------------------

    # Foreign Keys
    patient_note = db.relationship("Patient",back_populates="notes")

    # Function to return an JSON object
    def to_dict(self):
        return{
            "id":self.id,
            "title":self.title,
            "text":self.text,
            "created_at":self.created_at
        }
