CREATE TABLE projects (
    pid varchar(30) not null PRIMARY KEY,
    customer text ,
    loaddate datetime,
    dldate datetime,
    expdate datetime,
    pstatus int(3),
    loadeggs int(3),
    hatched int(3),
    srate float(3),
    comments text
)