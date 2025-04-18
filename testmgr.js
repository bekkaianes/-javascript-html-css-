var dbmgr = require("./dbmgr");
var db = dbmgr.db;


exports.getNames=() => {
    const sql = "SELECT * FROM etatList";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
}

exports.addEtat = (etatName, etatPrice) => {
    const sql = "INSERT INTO etatList (etatName, etatPrice) VALUES (?, ?)";
    let stmt = db.prepare(sql);
    let res = stmt.run(etatName, etatPrice);
    return res;
}

exports.updateEtatPrice = (etatNum, newPrice) => {
        const sql = "UPDATE etatList SET etatPrice = ? WHERE etatNum = ?";
        const stmt = db.prepare(sql);
        const res = stmt.run(newPrice, etatNum);
};

exports.removeEtat = (etatNum) => {  
        const sql = "DELETE FROM etatList WHERE etatNum = ?";
        const stmt = db.prepare(sql);
        const res = stmt.run(etatNum);
};

exports.addBinInf = (binificaireNom, binificairePrenom, binificaireAge, binificaireId, binificaireTel, binificaireJob, binificaireBaladiya,etatName, binificaireChild, binificaireSickChild , binificairePartner,binificairePartnerId, organisationName, binificaireAmount) => {
    const sql = "INSERT INTO binificaire ( binificaireNom, binificairePrenom, binificaireAge, binificaireId, binificaireTel, binificaireJob, binificaireBaladiya,etatName, binificaireChild, binificaireSickChild , binificairePartner,binificairePartnerId, organisationName, binificaireAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let stmt = db.prepare(sql);
    let res = stmt.run(binificaireNom, binificairePrenom, binificaireAge, binificaireId, binificaireTel, binificaireJob, binificaireBaladiya,etatName, binificaireChild, binificaireSickChild, binificairePartner,binificairePartnerId, organisationName, binificaireAmount);
    return res;
};

exports.getBinInf = () => {
    const sql = "SELECT * FROM binificaire";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
};

exports.removeBinInf = (binificaireNum) => {  
    const sql = "DELETE FROM binificaire WHERE binificaireNum = ?";
    const stmt = db.prepare(sql);
    const res = stmt.run(binificaireNum);
};

exports.addBaladiya = (binificaireBaladiya) => {
    const sql = "INSERT INTO baladiya (binificaireBaladiya) VALUES (?)";
    let stmt = db.prepare(sql);
    let res = stmt.run(binificaireBaladiya);
    return res;
}

exports.getBaladiya = () => {
    const sql = "SELECT * FROM baladiya";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
}

exports.removeBaladiya = (baladiyaNum) => {  
    const sql = "DELETE FROM baladiya WHERE baladiyaNum = ?";
    const stmt = db.prepare(sql);
    const res = stmt.run(baladiyaNum);
};

exports.addOrg = (binificaireBaladiya, organisationName, organisationType, responsableName) => {
    const sql = "INSERT INTO organisation (binificaireBaladiya, organisationName, organisationType, responsableName) VALUES ( ?, ?, ?, ?)";
    let stmt = db.prepare(sql);
    let res = stmt.run(binificaireBaladiya, organisationName, organisationType, responsableName );
    return res;
};

exports.getOrganisations = () => {
    const sql = "SELECT * FROM organisation";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
};
exports.addResponsable = (responsableName, responsableTel, responsableEmail) => {
    const sql = `INSERT INTO responsable  (responsableName, responsableTel, responsableEmail)  VALUES (?, ?, ?)`;
    const stmt = db.prepare(sql);
    const res = stmt.run(responsableName, responsableTel, responsableEmail);
    return res; // Return the new ID
};
exports.getOrgInf = () => {
    const sql = "SELECT * FROM organisation";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
};
exports.getRespInf = () => {
    const sql = "SELECT * FROM responsable";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
};
exports.removeOrganisation = (organisationNum) => {  
    const sql = "DELETE FROM organisation WHERE organisationNum = ?";
    const stmt = db.prepare(sql);
    const res = stmt.run(organisationNum);
};


exports.addMantants = (value_m) => {
    const sql = "INSERT INTO mantants (value_m) VALUES (?)";
    let stmt = db.prepare(sql);
    let res = stmt.run(value_m);
    return res;
}